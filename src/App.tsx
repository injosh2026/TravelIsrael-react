import Routes from './routes/router'
// import './App.css'
import InitializeAuth from './auth/InitializeAuth'
import { AuthProvider } from './auth/AuthContext'
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <InitializeAuth>
          <Routes />
        </InitializeAuth>
      </AuthProvider>
    </Provider>
  )
}

export default App