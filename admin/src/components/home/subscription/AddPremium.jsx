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
  const [price, setPrice] = React.useState(20);
  const [selectedPeriod, setSelectedPeriod] = React.useState('monthly');

  // ... (previous code)

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const NoOfBoost = event.target.querySelector('#noOfBoost').value;
    const Period = event.target.querySelector('#selectPeriod').value;
    const Price = event.target.querySelector('#price').value;
    const Type = 'Normal';

    // Validation: Check if any of the required fields are empty
    if (!NoOfBoost || !Period || !Price) {
      setError('All fields are required');
      return;
    }

    setError('');

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
      console.log(error);
      toast.error(<b>{error.response?.data.error || 'Something went wrong'}</b>);
    }
  };

  const handleBack = () => {
    props.done(false);
  };

  React.useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('planData')) || [];
    setPlans(storedPlans);
  }, [plans]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const storeToLocal = (event) => {
    event.preventDefault();

    const titleInput = event.target.querySelector('input[placeholder="Title"]');
    const limitInput = event.target.querySelector('input[placeholder="Limit"]');

    // Validation: Check if all input fields are empty
    if (!titleInput.value || !limitInput.value || !selectedFile) {
      setError('All fields are required');
      return;
    }

    setError('');

    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('planData')) || [];

    // Create a new plan object with the image path
    const newPlan = {
      title: titleInput.value,
      icon: URL.createObjectURL(selectedFile), // Capture the path of the selected icon image
      limit: limitInput.value,
    };

    // Store only the new plan data in localStorage
    localStorage.setItem('planData', JSON.stringify([...existingData, newPlan]));

    // Clear the form fields and reset selectedFile
    titleInput.value = '';
    limitInput.value = '';
    setSelectedFile(null);
  };

  const deleteFeature = (index) => {
    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('planData')) || [];

    // Remove the item at the specified index
    existingData.splice(index, 1);

    // Update localStorage with the modified data
    localStorage.setItem('planData', JSON.stringify(existingData));

    // Update state to reflect the changes
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
                borderBottom: 'solid black 1px',
                marginBottom: '10px',
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
                <div className='d-flex justify-content-center mt-4'>
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
                    style={{ width: '25%', height: '5vh' }}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="mt-3" style={{ alignSelf: 'flex-start' }}>
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
              <form className='mt-1 mb-2 text-center' onClick={handleSubmit}>
              <h6 className="mt-1 pb-2" style={{ borderBottom: 'solid 1px' }}>
                Soulmate Premium <span>price :</span> {price} / {selectedPeriod}
              </h6>                <table style={{ width: '100%' }}>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
