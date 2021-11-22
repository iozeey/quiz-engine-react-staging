import React, { Component } from "react";
import { Collapse, Button } from "reactstrap";
class ExpandCollapse extends Component {
  state = {
    isPullDown: true,
  };

  setIsPullDown = (val) => {
    this.setState({ isPullDown: val });
  };

  render() {
    return (
      <>
        <div
          className={`app-page-title  flex-btw p-0 cstm-breadcrumb bg-white`}
        >
          <Collapse isOpen={this.state.isPullDown}>
            {this.props.children}
          </Collapse>

          <Button
            className="rounded-0"
            color="link"
            onClick={() => this.setIsPullDown(!this.state.isPullDown)}
            block
          >
            {this.state.isPullDown ? "Expand" : "Collapse"}
          </Button>
        </div>
      </>
    );
  }
}

export default ExpandCollapse;
