import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { fetchPlan } from "../../../helper/helper";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { deletePlan } from "../../../helper/helper";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import AddNormal from "./AddNormal";

function NormalSubscritption() {
  const [add, setAdd] = useState(false);
  const [plan, setPlan] = useState([]);
  const [dltBox, setDltBox] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const create = () => {
    setAdd(true);
  };

  const done = (a) => {
    setAdd(false);
    if(a!=false){
 setTimeout(() => {
      toast.success(<b>Plan created</b>);
    }, 1000); 
    }
   
  };

  const fetchData = async () => {
    try {
      const fetchedPlan = await fetchPlan();
      setPlan(fetchedPlan);
    } catch (error) {
      console.error("Error in Plan:", error);
    }
  };

  const deleteCPlan = (id) => {
    setSelectedItemId(id);
    setDltBox(true);
  };

  const handleDeleteConfirmation = async () => {
    await deletePlan(selectedItemId)
      toast.success(<b>Plan Deleted</b>);
 
    setDltBox(false);
    setSelectedItemId(null);
    fetchData();
 
  };

  const handleClose = () => {
    setDltBox(false);
    setSelectedItemId(null);
  };


  useEffect(() => {
    fetchData();
  }, [add, plan]);

  return (
    <>
      {/* {!add ? ( */}
        <div className="container ">
          <Toaster/>
          <div className="row">
            <div className="col-12 d-flex justify-content-end ">
            <motion.button
  whileHover={{ scale: 1.1, backgroundColor: 'white', color: 'black'}}
  style={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}
  transition={{ duration: 0.3 }}
  className="p-2 link rounded"
  onClick={create} 
>
Create a Plan
</motion.button> 

            </div>
            <div className="col-12 d-flex justify-content-center mt-2 ">
              <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor:'#B2BEB5'}}>
                <thead>
                  <tr style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                    <th style={{ border: '1px solid #ddd', padding: '12px' }}>Sl.No</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px' }}>Price ( in $ )</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px' }}>Period</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px' }}>Number of boost</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.map((item, index) => (
                    <tr key={index} style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.Price}</td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.Period}</td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.NoOfBoost}</td>
                      <td>
                        <RiDeleteBin2Fill
                          onClick={() => deleteCPlan(item._id)}
                          style={{ cursor: 'pointer', color: 'rgba(130, 26, 95, 1)', width: '20px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     
          {/* <AddNormalSub done={done} /> */}
          <AddNormal open={add} done={done}/>
   
      <Modal show={dltBox} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NormalSubscritption;
