export function formatDate(date) {
  if (date)
    return new Date(date)
      .toLocaleDateString('en-us', {
        // you can use undefined as first argument
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        
      })
      .toString()
      
}
