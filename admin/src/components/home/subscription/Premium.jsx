import React, { useEffect, useState } from "react";
import { fetchPremiumPlan } from "../../../helper/helper";
import { deletePlan } from "../../../helper/helper";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import AddPremium from "./AddPremium";

function Premium() {
  const [add, setAdd] = useState(false);
  const [plan, setPlan] = useState([]);
  const [dltBox, setDltBox] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const create = () => {
    setAdd(true);
  };

  const done = (a) => {
    setAdd(false);
    if (a !== false) {
      setTimeout(() => {
        toast.success(<b>Plan created</b>);
      }, 1000);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedPlan = await fetchPremiumPlan();
      setPlan(fetchedPlan);
    } catch (error) {
      console.error("Error in Plan:", error);
    }
  };

  const deleteCPlan = async (id) => {
    setSelectedItemId(id);
    setDltBox(true);
  };

  const handleDeleteConfirmation = async () => {
    await deletePlan(selectedItemId);

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
      <div className="container">
        <Toaster />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'white', color: 'black' }}
              style={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}
              transition={{ duration: 0.3 }}
              className="p-2 link rounded"
              onClick={create}
            >
              Create a Plan
            </motion.button>
          </div>
          <div className="col-12 mt-2" style={{ overflowX: 'auto', height: 'auto' }}>
            <div className="d-flex flex-wrap">
              {plan.map((item, index) => (
                <div key={item._id} className="card mt-2 ms-2" style={{ width: '30%', backgroundColor: '#B2BEB5' }}>
                  <div className="card-body">
                    <p>Plan {index + 1}</p>
                    <h5 className="card-title">features</h5>
                    <p className="card-text">{item.Features}</p>
                    <p className="card-text">Price: {item.Price} / {item.Period}</p>
                    <div>
                      {item.Features.map((feature, index) => (
                        <div key={index} className="" style={{ marginBottom: '10px' }}>
                          {feature.limit}
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-danger" onClick={() => deleteCPlan(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddPremium open={add} done={done} />

      <Modal show={dltBox} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
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

export default Premium;
