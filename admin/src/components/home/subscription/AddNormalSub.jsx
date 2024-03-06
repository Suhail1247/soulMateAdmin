import React from 'react';
import { motion } from 'framer-motion';
import { createPlan } from '../../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

const rubber = () => {
  return {
    transform: [
      'scale3d(1,1,1)',
      'scale3d(1.4,.55,1)',
      'scale3d(.75,1.25,1)',
      'scale3d(1.25,.85,1)',
      'scale3d(.9,1.05,1)',
      'scale3d(1,1,1)',
    ],
  };
};

function AddNormalSub( props) {
  const words = ['create', 'a', 'plan'];


  const handleSubmit = async (event) => {
    event.preventDefault();
    const NoOfBoost = event.target.querySelector('#noOfBoost').value;
    const Period = event.target.querySelector('#selectPeriod').value;
    const Price = event.target.querySelector('#price').value;
    const Type = 'Normal';
  
    const planData = {
      NoOfBoost,
      Period,
      Price,
      Type,
    };
  
    try {
    await createPlan(planData);
      toast.loading(<b>creating plan...</b>, {
        duration: 2000,
      });
      setTimeout(() => {
        props.done();
      }, 2000);
    } catch (error) {
      toast.error(<b>{error.response?.data.error || 'Something went wrong'}</b>);
    }
  };
  const handleBack = () => {
    props.done(false)
  };

  return (<>
    <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' ,backgroundColor:'#e4e5f1', width: '50%' ,position:'relative',left:'25%'}}>
        <Toaster/>
        <button onClick={handleBack} style={{ position: 'absolute', left: '1%', top: '1%', fontSize: '18px',background:'none',outline:'none',border:'none'}}>Back</button>
       <div className=' d-flex  ps-3' style={{ textAlign: 'center', width: '100%' ,fontSize:'20px'}}>
       {words.map((word, wordIndex) => (
           <React.Fragment key={wordIndex}>
             {word.split('').map((char, charIndex) => (
               <motion.label whileHover={rubber()} key={charIndex}>
                 {char}
               </motion.label>
             ))}
             {wordIndex < words.length - 1 && '\u00A0'}
           </React.Fragment>
         ))}
         </div><div className=' d-flex align-items-center ps-3' style={{ textAlign: 'center', width: '100%' }}>
       <form className='mt-1' style={{ marginBottom: '20px', width: '100%' }} onSubmit={handleSubmit}>
       <div  className='mt-1'>
             <label htmlFor="noOfBoost">No of Boost :</label>
             <input type="text" id="noOfBoost" name="noOfBoost" style={{position:'relative',left:'3%', width:'50%'}}/>
           </div>
           <div  className='mt-4'>
             <label htmlFor="selectPeriod">Select Period :</label>
             <select id="selectPeriod" name="selectPeriod" style={{ position: 'relative', left: '2%', width:'50%',height:'5vh'}}>
     <option value="monthly">Monthly</option>
     <option value="yearly">Yearly</option>
     <option value="weekly">Weekly</option>
   </select>          </div>
           <div  className='mt-4'>
             <label htmlFor="price">Price ( in $ ) :</label>
             <input type="text" id="price" name="price"  style={{position:'relative',left:'3%', width:'50%'}}/>
           </div>
           <button className='mt-5' type="submit">Submit</button>
         </form>
         </div>
     </div>
     </>
   );
 }
 
 export default AddNormalSub;