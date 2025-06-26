import { useQuery } from "@tanstack/react-query"

// Tipo del producto para definir campos
type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  rating: number,
  thumbnail: string
}

function App() {

  // Funcion que consulta o consume la API 
  const getProducts = async () => {
    const response = await fetch('https://dummyjson.com/products/');
    if (!response.ok) {
      throw new Error("Networking Fail")
    }
    return response.json()
  }

  // Hook useQuery este define los datos asi como el estado 
  // en el que estan durante el consumo de la API
  const { data, status } = useQuery({
    //Definicion del nombre con el que se guradaran en cache
    queryKey: ['products'],
    //Definicion de la funcion que se encargara de la consulta de la API
    queryFn: getProducts,
    refetchInterval: 5000 // <-- Intervalo de actuliazcion
  })

  //Evalucion de estados del Hook

  // Retorna un elemento mientras se tiene respuesta de la API
  if (status === 'pending') {
    return (<>
      <div className="flex justify-center items-center h-dvh bg-blue-500">
        <h1
          className="animate-pulse text-4xl font-bold text-white"
        >
          Loading...
        </h1>
      </div>
    </>)
  }


  // Retorna un elemento ya sea cuando la API no funciona o no tarda demasiado en responder
  if (status === 'error') {
    return (<>
      <div className="flex justify-center items-center h-dvh bg-red-500">
        <h1
          className="animate-pulse text-center text-4xl font-bold text-white"
        >
          Error in fetch data...
        </h1>
      </div>
    </>)

  }

  return (
    <>
      <div className="w-full h-auto bg-blue-500 py-2 fixed top-0 z-99">
        <h1 className="text-center font-bold text-2xl text-white">Lista de productos</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-20 mx-5 my-5 bg-white">
        {/* Recorrido de los datos obtenidos de la API */}
        {data?.products?.map((ele: Product) => (
          <div
            className="w-full shadow-black rounded-2xl p-5 shadow-md hover:scale-105 transition-all h-150"
            key={ele.id}
          >
            <img src={ele.thumbnail || 'https://via.placeholder.com/150'} alt={ele.title} />
            <p
            >
              ⭐ {ele.rating}</p>

            <h3
              className="text-2xl font-bold">
              {ele.title}</h3>
            <p
              className="text-xl font-semibold"
            >$
              {ele.price}</p>
            <p
              className="bg-gray-200 p-3 h-auto min-h-35 max-h-40 rounded-2xl"
            >
              {ele.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
