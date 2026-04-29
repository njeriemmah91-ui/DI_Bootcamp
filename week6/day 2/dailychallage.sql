SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id IS NULL
);
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab WHERE id = 5
);
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN (
    SELECT id FROM SecondTab
);
SELECT COUNT(*)
WHERE id NOT IN (
  SELECT id FROM table WHERE id IS NOT NULL
);