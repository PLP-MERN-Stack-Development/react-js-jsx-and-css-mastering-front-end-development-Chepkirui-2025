export const searchItems = (items, searchTerm, fields = ['title', 'body']) => {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    fields.some(field => 
      item[field]?.toLowerCase().includes(term)
    )
  );
};