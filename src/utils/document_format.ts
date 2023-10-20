export const documentFormat = (document: string) => {
  if (!document) return ''

  const documentFormat = document.replace(/\D/g, '')

  if (documentFormat.length === 11) {
    return documentFormat.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return documentFormat.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
