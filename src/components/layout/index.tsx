import Header from "../header"
import Container from "../container"
import NavBar from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import {
  selectIsAuthentificated,
  selectUser,
} from "../../features/user/userSlice"
import { useEffect } from "react"

const Layout = () => {
  const isAuthentificated = useAppSelector(selectIsAuthentificated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthentificated) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}

export default Layout
