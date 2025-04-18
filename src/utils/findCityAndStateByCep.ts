import cepLocate from 'cep-promise'

function formatCep(cep: string): string {
  const onlyNumbers = cep.replace(/\D/g, '')
  return onlyNumbers.replace(/(\d{5})(\d{3})/, '$1-$2')
}

export async function findCityAndStateByCep(cep: string) {
  const formattedCep = formatCep(cep)

  const location = await cepLocate(formattedCep)
  const { state, city } = location

  return {
    state,
    city,
  }
}
