import { useRef, useState } from 'react'
import CustomInputWithTextAndIcon from '../../../../components/Input/CustomInputWithTextAndIcon'
import { axiosApi } from '../../../../services/axios'
import { useGlobalStore } from '../../../../store'

interface Step3Props {
  retProps(zip: string, addressNickname: string, addressNumber: string, address: string, neighborhood: string, city: string, state: string, errors: Array<String>): void
}

export default function Step3({ retProps }: Step3Props) {
  const [errors, setErrors] = useState([])
  const [zip, setZip] = useState('')
  const [addressNickname, setAddressNickname] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [address, setAddress] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const addressNumberInputRef = useRef(null)

  const cepMask = '99999-999'

  const fetchAddress = async (val: string) => {
    useGlobalStore.setState({ isLoading: true })

    try {
      const search = await axiosApi.get(`/zip/${val}`)

      setAddress(search.data.data.address)
      setNeighborhood(search.data.data.neighborhood)
      setCity(search.data.data.city)
      setState(search.data.data.state)
      retProps(val, addressNickname, addressNumber, search.data.data.address, search.data.data.neighborhood, search.data.data.city, search.data.data.state, errors)

      addressNumberInputRef.current.focus()
    } catch (e) {
      if (e.response.status === 404) {
        setErrors([...errors, 'zipNotFound'])
      }
    }

    useGlobalStore.setState({ isLoading: false })
  }

  return (
    <>
      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={40}
        label="CEP"
        mask={cepMask}
        onChangeText={(_, value) => {
          if (value.length === 8) {
            fetchAddress(value)
            setZip(value)
          }
        }}
        error={errors.includes('document')}
        erroMessage="CEP inválido"
        value={zip}
        placeholder="00000-000"
      />

      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Número"
        mask="9999999"
        onChangeText={(_, value) => {
          setAddressNumber(value)
          retProps(zip, addressNickname, value, address, neighborhood, city, state, errors)
        }}
        value={addressNumber}
        placeholder="Número"
        addrRef={addressNumberInputRef}
      />

      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Nome do endereço (Opcional)"
        onChangeText={(_, value) => {
          setAddressNickname(value)
          retProps(zip, value, addressNumber, address, neighborhood, city, state, errors)
        }}
        value={addressNickname}
        placeholder="Nome do local"
      />

      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Endereço"
        onChangeText={(_, value) => {
          setAddress(value)
          retProps(zip, addressNickname, addressNumber, value, neighborhood, city, state, errors)
        }}
        value={address}
        placeholder="Endereço"
      />
      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Bairro"
        onChangeText={(_, value) => {
          setNeighborhood(value)
          retProps(zip, addressNickname, addressNumber, address, value, city, state, errors)
        }}
        value={neighborhood}
        placeholder="Seu bairro"
      />

      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Cidade"
        onChangeText={(_, value) => {
          setCity(value)
          retProps(zip, addressNickname, addressNumber, address, neighborhood, value, state, errors)
        }}
        value={city}
        placeholder="Sua cidade"
      />
      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={20}
        label="Estado"
        onChangeText={(_, value) => {
          setState(value)
          retProps(zip, addressNickname, addressNumber, address, neighborhood, city, value, errors)
        }}
        value={state}
        placeholder="Seu estado"
      />
    </>
  )
}
