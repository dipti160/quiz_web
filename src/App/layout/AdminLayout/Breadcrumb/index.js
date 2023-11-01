import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuItems from "../../../../menu-items"; // Import the menu items based on roles
import config from "../../../../config";
import DEMO from "../../../../store/constant";
import Aux from "../../../../hoc/_Aux";

class Breadcrumb extends Component {
  state = {
    main: [],
    item: [],
  };

  componentDidMount() {
    const role = "admin"; // Replace 'admin' with the actual user role received from your application state
    const menu = menuItems[role]; // Get menu items based on user role

    menu.map((item) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item);
      }
      return false;
    });
  }

  getCollapse = (item) => {
    if (item.children) {
      item.children.forEach((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          this.getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            this.setState({ item: collapse, main: item });
          }
        }
      });
    }
  };

  render() {
    let main, item;
    let breadcrumb = "";
    let title = "Welcome";
    if (this.state.main && this.state.main.type === "group") {
      main = (
        <li className="breadcrumb-item">
          <Link to={DEMO.BLANK_LINK}>{this.state.main.title}</Link>
        </li>
      );
    }

    if (this.state.item && this.state.item.type === "item") {
      title = this.state.item.title;
      item = (
        <li className="breadcrumb-item">
          <Link to={DEMO.BLANK_LINK}>{title}</Link>
        </li>
      );

      // Check if breadcrumbs should be displayed for the current item
      if (this.state.item.breadcrumbs !== false) {
        breadcrumb = (
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">{title}</h5>
                    {console.log(this.state.item)}
                  </div>
                  {/* <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home" />
                      </Link>
                    </li>
                    {main}
                    {item}
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    document.title = title + " | Quiz web Application";

    return <Aux>{breadcrumb}</Aux>;
  }
}

export default Breadcrumb;
