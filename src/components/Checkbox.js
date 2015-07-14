import React from 'react';
import classnames from 'classnames';

const TINY_TIMEOUT = 0.001;
const INPUT = 'mdl-checkbox__input';
const BOX_OUTLINE = 'mdl-checkbox__box-outline';
const FOCUS_HELPER = 'mdl-checkbox__focus-helper';
const TICK_OUTLINE = 'mdl-checkbox__tick-outline';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';
const RIPPLE_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
const RIPPLE_CONTAINER = 'mdl-checkbox__ripple-container';
const RIPPLE_CENTER = 'mdl-ripple--center';
const RIPPLE = 'mdl-ripple';
const IS_FOCUSED = 'is-focused';
const IS_DISABLED = 'is-disabled';
const IS_CHECKED = 'is-checked';
const IS_UPGRADED = 'is-upgraded';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: !!this.props.disabled,
      checked: !!this.props.checked,
      isFocused: false,
    };
    if (this.props.ripple) {

    }
    this.boundInputOnChange = this.onChange_.bind(this);
    this.boundInputOnFocus = this.onFocus_.bind(this);
    this.boundInputOnBlur = this.onBlur_.bind(this);
    this.boundElementMouseUp = this.onMouseUp_.bind(this);
    this.boundElementClick = this.onClick_.bind(this);
  }

  onChange_(){
    this.props.onChange && this.props.onChange(this.state.checked);
  }

  onFocus_() {
    this.setState({
      isFocused: true,
    });
  }

  onBlur_() {
    this.setState({
      isFocused: false,
    });
  }

  onMouseUp_() {
    window.setTimeout(() => {
      this.mainElement.blur();
    }.bind(this), TINY_TIMEOUT);
  }

  onClick_(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.state.disabled) {
      return;
    }
    this.setState({
      checked: !this.state.checked,
    }, () => {
      this.onChange_(this.state.checked);
    }.bind(this));
  }

  updateClasses_() {

  }

  render() {
    const labelClass = classnames({
      'mdl-checkbox mdl-js-checkbox is-upgraded': true,
      'mdl-js-ripple-effect': this.props.ripple,
      'mdl-js-ripple-effect--ignore-events': this.props.ripple,
      'is-disabled': this.state.disabled,
      'is-checked': this.state.checked,
      'is-focused': this.state.isFocused,
    });
    let rippleElement = null;
    if (this.props.ripple) {
      rippleElement = (
        <span className={classnames(RIPPLE_CONTAINER, RIPPLE_EFFECT, RIPPLE_CENTER)} onMouseUp={this.boundElementMouseUp}>
          <span className={RIPPLE}></span>
        </span>
      );
    }
    return (
      <label ref="mainElement" className={labelClass} onMouseUp={this.boundElementMouseUp} onClick={this.boundElementClick} >
        <input type="checkbox" onChange={this.boundInputOnChange} onFocus={this.boundInputOnFocus} onBlur={this.boundInputOnBlur} className="mdl-checkbox__input" checked={this.state.checked} />
        <span className="mdl-checkbox__label">Checkbox</span>
        <span className={FOCUS_HELPER}></span>
        <span className={BOX_OUTLINE}>
          <span className={TICK_OUTLINE}></span>
        </span>
        {rippleElement}
      </label>
    );
  }

  componentDidMount() {
    this.mainElement = this.refs.mainElement.getDOMNode();
  }
}

Checkbox.proptypes = {
  onChange: React.PropTypes.func,
  checked: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
};

export default Checkbox;
