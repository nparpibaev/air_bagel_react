import React, {useState} from "react"

export const ParameterContext = React.createContext(null)


export const ParameterProvider = ({children}) => {

    const [parameters, setParameters] = useState({})

    return (
        <ParameterContext.Provider value={{parameters, setParameters}}>
            {children}
        </ParameterContext.Provider>
    )
}