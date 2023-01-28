import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Loader from "./Loader";
import Message from "./Message";

const ProfileDetails = ({ history, location }) => {
  const [edit, setEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, err } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit || changePassword) {
      if (newPassword !== confirmNewPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(
          updateUserProfile({
            id: user._id,
            name,
            email,
            password,
            newPassword,
          })
        );
        setEdit(false);
        setChangePassword(false);
      }
    }
  };

  const detailsEditHandler = () => {
    setEdit(!edit);
  };

  const passwordChangeHandler = () => {
    setChangePassword(!changePassword);
  };

  return (
    <Row>
      <Col md={4}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {err && <Message variant="danger">{err}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name: {!edit && <h6>{name}</h6>}</Form.Label>
            {edit && (
              <Form.Control
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            )}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address: {!edit && <h6>{email}</h6>}</Form.Label>
            {edit && (
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            )}
          </Form.Group>

          {(edit || changePassword) && (
            <Form.Group controlId="password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {changePassword && (
            <>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmNewPassword">
                <Form.Label>Confirm New Password</Form.Label>
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
            <a
              style={{
                cursor: "pointer",
                ":hover": { color: "red" },
              }}
              onClick={passwordChangeHandler}
            >
              {!changePassword && "Change Your Password"}
              {changePassword && "Cancel Password Change"}
            </a>
          </Form.Group>
          {edit ||
            (changePassword && (
              <Button className="mt-2" type="submit" variant="primary">
                Update
              </Button>
            ))}
        </Form>
      </Col>
      <Col>
        {!edit && (
          <p style={{ cursor: "pointer" }} onClick={detailsEditHandler}>
            <i className="fa-solid fa-gear"></i> edit
          </p>
        )}
        {edit && (
          <p style={{ cursor: "pointer" }} onClick={detailsEditHandler}>
            <i className="fa-solid fa-circle-xmark"></i> cancel
          </p>
        )}
      </Col>
    </Row>
  );
};

export default ProfileDetails;
