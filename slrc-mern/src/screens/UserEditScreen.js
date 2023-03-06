import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsById, updateUserByAdmin } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MyAddress from "../components/MyAddress";

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [changePassword, setChangePassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userById = useSelector((state) => state.userDetailsById);
  const { user: userInfo, loading: detailsLoading } = userById;
  const { user: userData, address } = userInfo;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, err } = userUpdateProfile;

  console.log("b", userData);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/profile");
    } else {
      if (!userInfo.user) {
        dispatch(getUserDetailsById(match.params.id));
      } else if (userId !== userInfo.user._id) {
        dispatch(getUserDetailsById(match.params.id));
      } else {
        setName(userData.name);
        setEmail(userData.email);
      }
      setSubmitted(false);
    }
  }, [dispatch, userData, user, userId, submitted]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (changePassword) {
      if (newPassword !== confirmNewPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(
          updateUserByAdmin({
            id: userData._id,
            name,
            email,
            isAdmin,
            newPassword,
          })
        );
        setChangePassword(false);
      }
    } else {
      dispatch(
        updateUserByAdmin({
          id: userData._id,
          name,
          email,
          isAdmin,
        })
      );
    }
    setSubmitted(true);
    console.log(isAdmin)
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => {
          history.push("/dashboard/users");
        }}
      >
        {"< Back"}
      </Button>
      {loading || detailsLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {err && <Message variant="danger">{err}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <FormGroup>
                <Form.Label>Is Admin</Form.Label>
                <Form.Control
                  as="select"
                  value={isAdmin || ""}
                  onChange={(e) => {
                    setIsAdmin(e.target.value);
                    console.log(isAdmin)
                  }}
                >
                  <option disabled value="" >
                      Select
                    </option>
                  <option value={false}>User</option>
                  <option value={true}>Admin</option>
                </Form.Control>
              </FormGroup>
              {changePassword && userData.isAdmin !== user.isAdmin && (
                <>
                  <Form.Group controlId="newPassword">
                    <Form.Label>User New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmNewPassword">
                    <Form.Label>Confirm User New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </>
              )}
              <Form.Group>
                <div
                  style={{
                    cursor: "pointer",
                    ":hover": { color: "red" },
                  }}
                  onClick={() => {
                    setChangePassword(!changePassword);
                  }}
                >
                  {!changePassword
                    ? "Change User Password"
                    : "Cancel Password Change"}
                </div>
              </Form.Group>
              <Button className="mt-2" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          {!address && <Loader />}
          {address && (
            <Col md={6}>
              {address.map((address) => (
                <ListGroup key={address._id}>
                  <MyAddress address={address} fromUserEditScreen={true} />
                </ListGroup>
              ))}
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default UserEditScreen;
