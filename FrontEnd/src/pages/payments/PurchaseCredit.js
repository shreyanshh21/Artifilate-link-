import { useDispatch, useSelector } from "react-redux";
import { CREDIT_PACKS, PLAN_IDS, pricingList } from "../../config/payments";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../../config/config";
import { SET_USER } from "../../redux/user/actions";
import { Modal, Accordion } from "react-bootstrap";

function PurchaseCredit() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const handleBuyCredits = async (credits) => { /* unchanged */ };
  const handleSubscribe = async (planKey) => { /* unchanged */ };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`${serverEndpoint}/payments/history`, { withCredentials: true });
        setPurchaseHistory(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <section className="ezy__pricing10 light py-5" id="ezy__pricing10">
      <div className="container">
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="d-flex justify-content-between align-items-start w-100 flex-wrap">
          <div className="text-left">
            <h3 className="ezy__pricing10-heading">Choose Plan</h3>
            <p className="ezy__pricing10-sub-heading mt-3">
              Flexible options: one-time credits or recurring subscriptions.
            </p>
          </div>

          <div className="text-right mt-3 mt-md-0">
            <h3>Current Balance</h3>
            <p className="ezy__pricing10-sub-heading mt-3">
              {userDetails.credits} Credits
            </p>
          </div>
        </div>

        <div className="row">
          {/* Credit Pack Card */}
          <div className="col-md-6 col-xl-4 mt-4 text-center">
            <div className="card ezy__pricing10-card p-4 border-0 rounded-0">
              <div className="card-body pt-4">
                <p className="ezy__pricing10-meta-price">
                  <span className="ezy__pricing10-rate">Credit Packs</span>
                </p>
              </div>
              <div className="card-body pb-4 p-0">
                <ul className="nav ezy__pricing10-nav flex-column">
                  {CREDIT_PACKS.map(c => (
                    <li className="pb-2" key={c}>{c} CREDITS FOR ₹{c}</li>
                  ))}
                </ul>
                <button className="neon-button" onClick={() => setShowModal(true)}>
                  Buy Credits
                </button>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="col-md-6 col-xl-4 mt-4 text-center">
            <div className="card ezy__pricing10-card p-4 border-0 rounded-0">
              <div className="card-body pt-4">
                <p className="ezy__pricing10-meta-price">
                  <span className="ezy__pricing10-rate">₹199/month</span>
                </p>
              </div>
              <div className="card-body pb-4 p-0">
                <ul className="nav ezy__pricing10-nav flex-column">
                  {pricingList[1].list.map((item, i) => (
                    <li className="pb-2" key={i}>{item.detail}</li>
                  ))}
                </ul>
                <button className="neon-button" onClick={() => handleSubscribe('UNLIMITED_MONTHLY')}>
                  Subscribe Monthly
                </button>
              </div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="col-md-6 col-xl-4 mt-4 text-center">
            <div className="card ezy__pricing10-card p-4 border-0 rounded-0">
              <div className="card-body pt-4">
                <p className="ezy__pricing10-meta-price">
                  <span className="ezy__pricing10-rate">₹1990/year</span>
                </p>
              </div>
              <div className="card-body pb-4 p-0">
                <ul className="nav ezy__pricing10-nav flex-column">
                  {pricingList[2].list.map((item, i) => (
                    <li className="pb-2" key={i}>{item.detail}</li>
                  ))}
                </ul>
                <button className="neon-button" onClick={() => handleSubscribe('UNLIMITED_YEARLY')}>
                  Subscribe Yearly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* React-Bootstrap Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Buy Credits</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {CREDIT_PACKS.map((c) => (
              <button
                key={c}
                className="m-2 btn btn-outline-primary"
                onClick={() => handleBuyCredits(c)}
              >
                Buy {c} Credits
              </button>
            ))}
          </Modal.Body>
        </Modal>

        {/* Purchase History */}
        <div className="mt-5">
          <h4>Purchase History</h4>
          {purchaseHistory.length === 0 ? (
            <p>No purchases yet.</p>
          ) : (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Plan/Credits</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.planOrCredits}</td>
                    <td>₹{item.amount}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Referral Placeholder */}
        <div className="mt-5 text-center">
          <h4>Invite & Earn</h4>
          <p>Share your referral code to earn bonus credits!</p>
          <p><strong>Your Referral Code:</strong> {userDetails.referralCode || "N/A"}</p>
        </div>

        {/* FAQ Section */}
        <Accordion defaultActiveKey="0" className="mt-5">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is the validity of credits?</Accordion.Header>
            <Accordion.Body>
              Credits are valid for lifetime until used.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I cancel my subscription anytime?</Accordion.Header>
            <Accordion.Body>
              Yes, you can cancel anytime from your account settings. Benefits continue till the end of the billing period.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Inline Styling */}
      <style>{`
        .ezy__pricing10 {
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          color: white;
          padding: 50px 0;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .ezy__pricing10-heading {
          font-weight: bold;
        }

        .ezy__pricing10-sub-heading {
          color: #d1d5db;
        }

        .ezy__pricing10-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .ezy__pricing10-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }

        .neon-button {
          padding: 10px 20px;
          border: none;
          border-radius: 50px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .neon-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }

        table.table {
          background-color: white;
          color: black;
          border-radius: 8px;
          overflow: hidden;
        }

        table th {
          background: #6d28d9;
          color: white;
        }

        table td, table th {
          vertical-align: middle !important;
        }
      `}</style>
    </section>
  );
}

export default PurchaseCredit;
