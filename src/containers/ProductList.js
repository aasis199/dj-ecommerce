import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {
  Container,
  Dimmer,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";
import { productListURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";

class ProductList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    this.setState({ loading: true });
    axios
      .get(productListURL)
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.toString(), loading: false });
      });
  };

  handleAddToCart = (slug) => {
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { slug })
      .then((res) => {
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.toString(), loading: false });
      });
  };

  render() {
    const { data, error, loading } = this.state;
    const { history } = this.props;

    return (
      <Container>
        {error && (
          <Message
            error
            header="There was an error with your submission"
            content={error}
          />
        )}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        <Item.Group divided>
          {data.map((item) => (
            <Item key={item.id}>
              <Item.Image src={item.image} />
              <Item.Content>
                <Item.Header
                  as="a"
                  onClick={() => history.push(`/products/${item.id}`)}
                >
                  {item.title}
                </Item.Header>
                <Item.Meta>
                  <span className="cinema">{item.category}</span>
                </Item.Meta>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                  <Button
                    primary
                    floated="right"
                    icon
                    labelPosition="right"
                    onClick={() => this.handleAddToCart(item.slug)}
                  >
                    Add to cart
                    <Icon name="cart plus" />
                  </Button>
                  {item.discount_price && (
                    <Label
                      color={
                        item.label === "primary"
                          ? "blue"
                          : item.label === "secondary"
                          ? "green"
                          : "olive"
                      }
                    >
                      {item.label}
                    </Label>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Container>
    );
  }
}

ProductList.propTypes = {
  history: PropTypes.object.isRequired,
  refreshCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshCart: () => dispatch(fetchCart()),
  };
};

export default connect(null, mapDispatchToProps)(ProductList);
