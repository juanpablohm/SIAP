import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import InnerContent from "./components/commons/InnerContent";
import CreateInternshipScreen from "./screens/CreateInternshipScreen";
import InternshipScreen from "./screens/InternshipScreen"

const MainRoutes = () => (

		<Routes>
			{/** Protected Routes */}
			{/** Wrap all Route under ProtectedRoutes element */}
			
			<Route path="/" element={<InnerContent/>}>
				<Route path="/" element={<Navigate replace to="practicas" />} /> 
				<Route  path="practicas" element={<InternshipScreen />} />
				<Route path="practicas/nueva" element={<CreateInternshipScreen /> } />	
			</Route>
			
		</Routes>

)

export default MainRoutes;