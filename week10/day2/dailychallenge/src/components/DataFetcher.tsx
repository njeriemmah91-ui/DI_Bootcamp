import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { FetchState } from '../types/types';
import {
  usersActions,
  recipesActions,
  postsActions,
} from '../features/dataSlice';
import * as api from '../api/api';
import '../styles/DataFetcher.css';

/**
 * Generic Data Fetcher Component
 * Uses TypeScript generics to fetch and display different types of data
 */

interface DataFetcherProps<T> {
  dataType: 'users' | 'recipes' | 'posts';
  title: string;
  renderItem: (item: T) => React.ReactNode;
  fetchFunction: () => Promise<T[]>;
  emptyMessage?: string;
}

export function DataFetcher<T extends { id: number }>({
  dataType,
  title,
  renderItem,
  fetchFunction,
  emptyMessage = 'No data available',
}: DataFetcherProps<T>): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  // Select the appropriate slice from Redux store
  const stateSelector = useCallback((state: RootState) => {
    switch (dataType) {
      case 'users':
        return state.users;
      case 'recipes':
        return state.recipes;
      case 'posts':
        return state.posts;
      default:
        return state.users;
    }
  }, [dataType]);

  const state = useSelector(stateSelector) as FetchState<T>;
  const { data, loading, error } = state;

  // Select the appropriate actions
  const getActions = useCallback(() => {
    switch (dataType) {
      case 'users':
        return usersActions;
      case 'recipes':
        return recipesActions;
      case 'posts':
        return postsActions;
      default:
        return usersActions;
    }
  }, [dataType]);

  const actions = getActions();

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(actions.fetchStart());
        const result = await fetchFunction();
        dispatch(actions.fetchSuccess(result));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        dispatch(actions.fetchError(errorMessage));
      }
    };

    loadData();
  }, [dataType, dispatch, actions, fetchFunction]);

  return (
    <div className="data-fetcher">
      <div className="fetcher-header">
        <h2>{title}</h2>
        <span className="count-badge">{data.length}</span>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading {dataType}...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="empty-container">
          <p className="empty-text">{emptyMessage}</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="data-grid">
          {data.map((item) => (
            <div key={item.id} className="data-item">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
