import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import InnerContent from "./components/commons/InnerContent";
import CreateInternshipScreen from "./screens/CreateInternshipScreen";
import EditInternshipScreen from "./screens/EditInternshipScreen";
import InternshipScreen from "./screens/InternshipScreen"
import SelectAgreementScreen from "./screens/SelectAgreementScreen";
import MinutaScreen from "./screens/MinutaScreen";
import AgreementScreen from "./screens/AgreementScreen";
import CreateAgreementScreen from "./screens/CreateAgreementScreen";
import StudentScreen from "./screens/StudentScreen";
import ProfessorScreen from "./screens/ProfessorScreen";

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
				<Route path="practicas/minuta/:id" element={<MinutaScreen /> } />	
				<Route path="convenios" element={<AgreementScreen />} />
				<Route path="convenios/nuevo" element={<CreateAgreementScreen /> } />	
				<Route path="practicantes" element={<StudentScreen />} /> 
				<Route path="docentes" element={<ProfessorScreen />} /> 
			</Route>
			
		</Routes>

)

export default MainRoutes;