import React from 'react';

/**
 * Generic List Component
 * Accepts any array of items and a render function to display each item
 * T - Generic type parameter for the items in the list
 */
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function List<T extends { id: number }>({
  items,
  renderItem,
  emptyMessage = 'No items to display',
}: ListProps<T>): JSX.Element {
  return (
    <ul className="list">
      {items.length === 0 ? (
        <li className="empty-message">{emptyMessage}</li>
      ) : (
        items.map((item) => (
          <li key={item.id} className="list-item">
            {renderItem(item)}
          </li>
        ))
      )}
    </ul>
  );
}
