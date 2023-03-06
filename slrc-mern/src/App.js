import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/shipping/:id" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/dashboard" component={DashboardScreen} />
            <Route path="/admin/users/:id" component={UserEditScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
