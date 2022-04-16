import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import InnerContent from "./components/InnerContent";
import PracticeScreen from "./screens/PracticeScreen";
import PracticeForm from "./components/PracticeForm";


const MainRoutes = () => (

		<Routes>
			{/** Protected Routes */}
			{/** Wrap all Route under ProtectedRoutes element */}
			
			<Route path="/" element={<InnerContent/>}>
				<Route path="/" element={<Navigate replace to="practicas" />} /> 
				<Route  path="practicas" element={<PracticeScreen />} />
				<Route path="practicas/nueva" element={<PracticeForm />} />	
			</Route>
			
		</Routes>

)

export default MainRoutes;