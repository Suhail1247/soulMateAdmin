import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { createPlan } from '../../../helper/helper';
import DialogContent from '@mui/material/DialogContent';
import toast, { Toaster } from 'react-hot-toast';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export default function AddPremium(props) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [plans, setPlans] = React.useState([]);
  const [error, setError] = React.useState('');
  const [price, setPrice] = React.useState();
  const [selectedPeriod, setSelectedPeriod] = React.useState('monthly');

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Features = localStorage.getItem('planData')
    const Period = event.target.querySelector('#selectPeriod').value;
    const Price = event.target.querySelector('#price').value;



    if (!Features || !Period || !Price) {
      toast.error('All fields are required');
      return;
    }

  

    const planData = {
      Features,
      Period,
      Price,
      Type: 'Premium',
    };

    try {
      await createPlan(planData);
      toast.loading(<b>creating plan...</b>, {
        duration: 2000,
      });
      setTimeout(() => {
        props.done();
        localStorage.removeItem('planData')
      }, 2000);
    } catch (error) {
      toast.error(<b>{error.response?.data.error || 'Something went wrong'}</b>);
    }
  };

  const handleBack = () => {
    props.done(false);
  };

  React.useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('planData')) || [];
    setPlans(storedPlans);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [plans]);

  const handleBeforeUnload = () => {
    localStorage.removeItem('planData');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    props.done(false);
  };

  const storeToLocal = (event) => {
    event.preventDefault();

    const titleInput = event.target.querySelector('input[placeholder="Title"]');
    const limitInput = event.target.querySelector('input[placeholder="Limit"]');

    if (!titleInput.value || !limitInput.value || !selectedFile) {
      toast.error('All fields are required');
      return;
    }



    const existingData = JSON.parse(localStorage.getItem('planData')) || [];
    const newPlan = {
      title: titleInput.value,
      icon: URL.createObjectURL(selectedFile),
      limit: limitInput.value,
    };

    localStorage.setItem('planData', JSON.stringify([...existingData, newPlan]));

    titleInput.value = '';
    limitInput.value = '';
    setSelectedFile(null);
  };

  const deleteFeature = (index) => {
    const existingData = JSON.parse(localStorage.getItem('planData')) || [];
    existingData.splice(index, 1);
    localStorage.setItem('planData', JSON.stringify(existingData));
    setPlans([...existingData]);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ margin: 0, padding: 0 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto',
              backgroundColor: '#B2BEB5',
              width: '100%',
              position: 'relative',
            }}
          >
            <Toaster />
            <button
              onClick={handleBack}
              style={{
                position: 'absolute',
                right: '1%',
                top: '1%',
                fontSize: '10px',
                background: '',
                outline: 'none',
              }}
            >
              X
            </button>
            <div
              className='mt-5'
              style={{
                textAlign: 'center',
                width: '100%',
                fontSize: '20px',
                borderBottom: 'solid black 1px'
              }}
            >
              <p>create a plan</p>
            </div>
            <div
              className='d-flex align-items-start ps-2 pe-2'
              style={{ textAlign: 'left', width: '100%' }}
            >
               <form
                className='mt-4'
                style={{ marginBottom: '20px', width: '100%' }}
                onSubmit={storeToLocal}
              >
                
                <div  style={{ alignSelf: 'flex-start' }}>
                  Features
                </div>
                <div className="mt-2 d-flex justify-content-center">
                  <input
                    type='text'
                    placeholder='Title'
                    style={{ width: '25%', height: '5vh' }}
                  />
                  <label htmlFor="file" className='ms-2 ' style={{ cursor: 'pointer' }}>
                    <div style={{ border: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                      <input
                        placeholder='Icon'
                        type='text'
                        value={selectedFile ? selectedFile.name : ''}
                        readOnly
                        style={{ width: '60%', height: '5vh' }}
                      />
                      <input
                        type='file'
                        id='file'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <span className='p-1' style={{ backgroundColor: '#D3D3D3', width: '40%', paddingRight: 0, height: '5vh' }} >Choose File</span>
                    </div>
                  </label>
                  <input
                    className='ms-2'
                    placeholder='Limit'
                    type='text'
                    style={{ width: '20%', height: '5vh' }}
                  />
                  <button className='ms-3 ' type="submit"> Add</button>
                </div>
              </form>
            </div>
            <div className="w-75 mb-2" style={{ backgroundColor: '#D3D3D3' }}>
              <form className='mt-1 mb-2 text-center' onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center mt-4 pb-2'style={{borderBottom:'solid gray 1px'}}>
                  <label htmlFor="selectPeriod">Select Period :</label>
                  <select
                    id="selectPeriod"
                    name="selectPeriod"
                    style={{ marginLeft: '1%', width: '25%', height: '5vh' }}
                    onChange={handlePeriodChange}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <label htmlFor="price" className='ps-3'>
                    Price (in $) :
                  </label>
                  <input
                    className='ms-1'
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    style={{ width: '25%', height: '5vh' }}
                    onChange={handlePriceChange}
                  />
                </div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={index}>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          {plan.title}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <img src={plan.icon} alt="" style={{ width: '20px', height: '20px' }} />
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          {plan.limit}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <RiDeleteBin2Fill className='link' onClick={() => deleteFeature(index)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button type="submit" className="btn btn-primary mt-2">
                  Submit
                </button>
              </form>
            </div>
         
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
