import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import InnerContent from "./components/InnerContent";
import InternshipForm from "./components/InternshipForm";
import InternshipScreen from "./screens/InternshipScreen"

const MainRoutes = () => (

		<Routes>
			{/** Protected Routes */}
			{/** Wrap all Route under ProtectedRoutes element */}
			
			<Route path="/" element={<InnerContent/>}>
				<Route path="/" element={<Navigate replace to="practicas" />} /> 
				<Route  path="practicas" element={<InternshipScreen />} />
				<Route path="practicas/nueva" element={<InternshipForm  />} />	
			</Route>
			
		</Routes>

)

export default MainRoutes;