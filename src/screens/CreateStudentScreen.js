{/* <Grid container spacing={4}>
                              <Grid item  xs={12} md={12} lg={12} >
                                <TextField 
                                  name="nameStudent" 
                                  label="Nombres"
                                  fullWidth
                                  value={data.student.firstName}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student, firstName: event.target.value }})}/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                  name="lastNameStudent" 
                                  label="Apellidos"
                                  value={data.student.lastName}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student, lastName: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                  name="documentIdStudent" 
                                  label="Cedula" 
                                  value={data.student.documentId}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student, documentId: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <DatePickerMUI 
                                  name="dateBirthStudent"
                                  label="Fecha de nacimiento"
                                  value={data.student.dateBirth} 
                                  onChange={(newValue) => setData({ ...data, student:{ ...data.student, dateBirth: newValue }})}/>
                              </Grid>

                              <Grid item  xs={12} md={12} lg={6} >
                                <TextField 
                                  name="cellphoneStudent" 
                                  label="Telefono"
                                  value={data.student.cellphone}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,cellphone: event.target.value }})}  
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                  name="emailStudent" 
                                  label="Email"
                                  value={data.student.email}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,email: event.target.value} })}  
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput 
                                  name="epsStudent"
                                  label="EPS" 
                                  value={data.student.eps}
                                  options={getEPS()}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,eps: event.target.value }})} 
                                  helper=""/>
                              </Grid>               

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput  
                                  name="universityStudent" 
                                  label="Universidad"
                                  options={getUniversity()} 
                                  value={data.student.university}                    
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,university: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <SelectInput  
                                  name="facultyStudent" 
                                  label="Facultad"  
                                  options={getFaculty()}
                                  value={data.student.faculty}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,faculty: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <SelectInput  
                                  name="programStudent" 
                                  label="Programa"
                                  options={getProgram()} 
                                  value={data.student.program}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,program: event.target.value }})} 
                                  fullWidth/>
                              </Grid>  
                    
                            </Grid>        */}