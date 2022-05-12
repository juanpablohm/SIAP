import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import InnerContent from "./components/commons/InnerContent";
import CreateInternshipScreen from "./screens/CreateInternshipScreen";
import EditInternshipScreen from "./screens/EditInternshipScreen";
import InternshipScreen from "./screens/InternshipScreen"
import SelectAgreementScreen from "./screens/SelectAgreementScreen";

const MainRoutes = () => (

		<Routes>
			{/** Protected Routes */}
			{/** Wrap all Route under ProtectedRoutes element */}
			
			<Route path="/" element={<InnerContent/>}>
				<Route path="/" element={<Navigate replace to="practicas" />} /> 
				<Route  path="practicas" element={<InternshipScreen />} />
				<Route  path="practicas/convenio" element={<SelectAgreementScreen />} />
				<Route path="practicas/nueva" element={<CreateInternshipScreen /> } />	
				<Route path="practicas/editar/:id" element={<EditInternshipScreen /> } />	
			</Route>
			
		</Routes>

)

export default MainRoutes;