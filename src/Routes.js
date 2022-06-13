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
import SupervisorEvaluationForm from "./components/SupervisorEvaluationForm";
import ProfessorEvaluationScreen from "./screens/ProfessorEvaluationScreen";
import CreateStudentScreen from "./screens/CreateStudentScreen";
import EditStudentScreen from "./screens/EditStudentScreen";
import CreateProfessorScreen from "./screens/CreateProfessorScreen";
import EditProfessorScreen from "./screens/EditProfessorScreen";
import CompanyScreen from "./screens/CompanyScreens";
import CreateCompanyScreen from "./screens/CreateCompanyScreen";
import EditCompanyScreen from "./screens/EditCompanyScreen";
import EditAgreementScreen from "./screens/EditAgreementScreen";

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
				<Route path="practicas/evaluacion/:id" element={<ProfessorEvaluationScreen/> } />
				<Route path="practicas/minuta/:id" element={<MinutaScreen /> } />	
				<Route path="convenios" element={<CompanyScreen />} />
				<Route path="convenios/nuevo/:id" element={<CreateAgreementScreen /> } />
				<Route path="convenios/editar/:id" element={<EditAgreementScreen /> } />
				<Route path="entidad/nueva" element={<CreateCompanyScreen /> } />	
				<Route path="entidad/editar/:id" element={<EditCompanyScreen /> } />	
				<Route path="practicantes" element={<StudentScreen />} /> 
				<Route path="practicantes/nuevo" element={<CreateStudentScreen />} /> 
				<Route path="practicantes/editar/:id" element={<EditStudentScreen />} /> 
				<Route path="docentes" element={<ProfessorScreen />} /> 
				<Route path="docentes/nuevo" element={<CreateProfessorScreen />} /> 
				<Route path="docente/editar/:id" element={<EditProfessorScreen />} /> 
			</Route>

			<Route path="evaluacion/:id" element={<SupervisorEvaluationForm />} /> 
			
		</Routes>

)

export default MainRoutes;