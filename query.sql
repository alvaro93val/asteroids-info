SELECT
	u.name AS Name,
	u.email AS Email,
	SUM(p.price * o.quantity) AS Total_amount_spent
FROM
	users u
INNER JOIN 
	orders o ON u.id = o.user_id
INNER JOIN 
	products p ON o.product_id = p.id
WHERE
	p.category = 'Electronics'
GROUP BY
	u.id
HAVING
	COUNT(DISTINCT o.id) >= 3
AND 
	Total_amount_spent > 1000
ORDER BY
	Total_amount_spent DESC;