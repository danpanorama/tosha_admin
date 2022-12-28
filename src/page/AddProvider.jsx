import AddProviderForm from "../components/AddProviderForm";
import {useFormik} from "formik"
import {useDispatch,useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { addProvidersNow, getAllProviders, removeProviderNow } from "../Redux/Actions/providerActions";
import ProvidersTable from "../components/ProvidersTable";
import DeleteAlert from "../components/DeleteAlert";


function AddProvider() {
  const admin = useSelector((state) => state.admin);
  const providers = useSelector((state) => state.providers);
const [popUpState,setPopUpState] = useState(false)
const [providerState,setProviderState] = useState({})

  const dispatch = useDispatch();




  useEffect(()=>{
dispatch(getAllProviders())
  })

  const addProvider = useFormik({
    initialValues:{
      name: "",
      agentname:'',
      address: "",
      phone: '',
      email:"",
      zipcode:'',
      cat:"",
      permissions:admin.admin.permissions
  },onSubmit:async values  => {
    try{
       dispatch(addProvidersNow({data:values}))
          
    }catch(e){
      console.log(e)
    }
  }});


  function popup(e){
   
    setProviderState(e)
    setPopUpState(true)
  }
  function closePopUp(){
    setPopUpState(false)
    setProviderState({})
  }

function removeProvider(id){
  closePopUp()
  let obj ={
    id:id,
    permissions:admin.admin.permissions
  }

  dispatch(removeProviderNow(obj))

}


    return (
      <div className="flexcol center">
        <div className="maxwidtable w100">
        <div className="heading">
        <h1>הוסף בפקים</h1>
        <p>כאן תוכל להוסיף ספקים או להוריד אותם</p>
        <p>רק</p>
        </div>
       <AddProviderForm addProvider={addProvider} />
       <br />
       {popUpState ?
       <div className="positionfix">
               <DeleteAlert removeProvider={removeProvider} closePopUp={closePopUp} provider={providerState}/>

       </div>
      :""}
       <ProvidersTable permissions={admin.admin.permissions} popup={popup} list={providers.providers} />
      </div></div>
    );
  }
   
  export default AddProvider;
  