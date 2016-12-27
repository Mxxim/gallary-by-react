'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('normalize.css/normalize.css');
require('styles/App.scss');

// 获取图片相关的数据
var imagesDatas = require('../data/imagesDatas.json');

// 利用自执行函数，将图片名信息转换成图片url路径信息
var imagesURLs = function (imagesDatasArr) {

  for (var i = 0, j = imagesDatasArr.length; i < j; i++) {
    var singleImageData = imagesDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imagesDatasArr[i] = singleImageData;
  }

  return imagesDatasArr;
}(imagesDatas);

var getRangeRandom = function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
};

// 获取 0 ～ 30度 之间的一个任意正负数
var get30DegRandom = function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
};

var ImgFigure = function (_React$Component) {
  _inherits(ImgFigure, _React$Component);

  function ImgFigure(props) {
    _classCallCheck(this, ImgFigure);

    var _this = _possibleConstructorReturn(this, (ImgFigure.__proto__ || Object.getPrototypeOf(ImgFigure)).call(this, props));

    _this.handlerClick = _this.handlerClick.bind(_this);
    return _this;
  }

  _createClass(ImgFigure, [{
    key: 'handlerClick',
    value: function handlerClick(event) {

      if (this.props.arrange.isCenter) {
        this.props.inverse();
      } else {
        this.props.center();
      }

      event.stopPropagation();
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {

      var stylObj = {};

      // 如果props属性中指定了这张图片的位置，则使用
      if (this.props.arrange.pos) {
        stylObj = this.props.arrange.pos;
      }

      // 如果图片的旋转角度有值并且不为0，添加旋转角度
      if (this.props.arrange.rotate) {
        var types = ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'];
        for (var i in types) {
          stylObj[types[i]] = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }
      }

      if (this.props.arrange.isCenter) {
        stylObj.zIndex = 11;
      }

      var imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

      return _react2.default.createElement(
        'figure',
        { className: imgFigureClassName, style: stylObj, onClick: this.handlerClick },
        _react2.default.createElement(
          'div',
          { className: 'img-div' },
          _react2.default.createElement('img', { src: this.props.data.imageURL,
            alt: this.props.data.title })
        ),
        _react2.default.createElement(
          'figcaption',
          null,
          _react2.default.createElement(
            'h2',
            { className: 'img-title' },
            this.props.data.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'img-back', onClick: this.handlerClick },
            _react2.default.createElement(
              'p',
              null,
              this.props.data.desc
            )
          )
        )
      );
    }
  }]);

  return ImgFigure;
}(_react2.default.Component);

var ControllerUnit = function (_React$Component2) {
  _inherits(ControllerUnit, _React$Component2);

  function ControllerUnit(props) {
    _classCallCheck(this, ControllerUnit);

    var _this2 = _possibleConstructorReturn(this, (ControllerUnit.__proto__ || Object.getPrototypeOf(ControllerUnit)).call(this, props));

    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(ControllerUnit, [{
    key: 'handleClick',
    value: function handleClick(event) {

      if (this.props.arrange.isCenter) {
        this.props.inverse();
      } else {
        this.props.center();
      }

      event.stopPropagation();
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {

      var controllerUnitClassName = "controller-unit";

      // 如果对应的是居中的图片，显示控制按钮的居中态
      if (this.props.arrange.isCenter) {
        controllerUnitClassName += " is-center";

        if (this.props.arrange.isInverse) {
          controllerUnitClassName += " is-inverse";
        }
      }

      return _react2.default.createElement('span', { className: controllerUnitClassName, onClick: this.handleClick });
    }
  }]);

  return ControllerUnit;
}(_react2.default.Component);

var AppComponent = function (_React$Component3) {
  _inherits(AppComponent, _React$Component3);

  function AppComponent(props) {
    _classCallCheck(this, AppComponent);

    var _this3 = _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).call(this, props));

    _this3.centerPos = {
      left: 0,
      top: 0
    };

    // 水平方向的取值范围
    _this3.hPosRange = {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    };

    // 垂直方向的q取值范围
    _this3.vPosRange = {
      x: [0, 0],
      topY: [0, 0]
    };

    _this3.state = {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left : '0',
        //     top: '0'
        //   },
        //  rotate: 0 // 旋转角度
        //  isInverse: false  // 图片正反面，true为反面，false为正面
        //  isCenter: false   // 图片是否居中
        // }
      ]
    };
    return _this3;
  }

  // 组件加载以后，为每张图片计算其位置


  _createClass(AppComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      // 拿到舞台的大小
      var stageDOM = _reactDom2.default.findDOMNode(this.refs.stage),
          stageW = stageDOM.scrollWidth,
          stageH = stageDOM.scrollHeight,
          stageHalfW = Math.ceil(stageW / 2),
          stageHalfH = Math.ceil(stageH / 2);

      // 拿到一个imgFigure的大小
      var imgFigureDOM = _reactDom2.default.findDOMNode(this.refs.imgFigure0),
          imgFigureW = imgFigureDOM.scrollWidth,
          imgFigureH = imgFigureDOM.scrollHeight,
          imgFigureHalfW = Math.ceil(imgFigureW / 2),
          imgFigureHalfH = Math.ceil(imgFigureH / 2);

      // 计算中心图片的位置
      this.centerPos.left = stageHalfW - imgFigureHalfW;
      this.centerPos.top = stageHalfH - imgFigureHalfH;

      // 计算左侧、右侧区域图片排布位置的取值范围
      // 以舞台中心为准，舞台左边：计算水平左侧取值范围
      this.hPosRange.leftSecX[0] = -imgFigureHalfW;
      this.hPosRange.leftSecX[1] = stageHalfW - imgFigureHalfW * 3;

      // 以舞台中心为准，舞台右边：计算水平右侧取值范围
      this.hPosRange.rightSecX[0] = stageHalfW + imgFigureHalfW;
      this.hPosRange.rightSecX[1] = stageW - imgFigureHalfW;

      this.hPosRange.y[0] = -imgFigureHalfH;
      this.hPosRange.y[1] = stageH - imgFigureHalfH;

      // 计算上侧区域图片排布位置的取值范围
      // this.vPosRange.x[0] = stageHalfW - imgFigureHalfW;
      this.vPosRange.x[0] = stageHalfW - imgFigureW;
      this.vPosRange.x[1] = stageHalfW;
      this.vPosRange.topY[0] = -imgFigureHalfH;
      this.vPosRange.topY[1] = stageHalfH - imgFigureHalfH * 3;

      this.rearrange(0);
    }

    /**
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
     * @return {Function} 这是一个闭包函数
     */

  }, {
    key: 'inverse',
    value: function inverse(index) {
      var _this4 = this;

      return function () {
        var imgsArrangeArr = _this4.state.imgsArrangeArr;
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

        _this4.setState({
          imgsArrangeArr: imgsArrangeArr
        });
      };
    }

    /**
     * 重新布局所有图片
     * @param centerIndex 指定居中图片是哪一张
     */

  }, {
    key: 'rearrange',
    value: function rearrange(centerIndex) {

      var imgsArrangeArr = this.state.imgsArrangeArr,
          centerPos = this.centerPos,
          hPosRangeY = this.hPosRange.y,
          hPosRangeLeftSecX = this.hPosRange.leftSecX,
          hPosRangeRightSecX = this.hPosRange.rightSecX,
          vPosRangeX = this.vPosRange.x,
          vPosRangeTopY = this.vPosRange.topY,
          imgsArrangeTopArr = [],
          imgsArrangeCenterArr = [];

      // 布局居中 centerIndex 的图片
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0, // 居中的 centerIndex 图片不需要旋转
        isCenter: true
      };

      // 取出要布局上侧图片的状态信息
      // 标记上侧区域的图片是从数组的哪个位置拿出来的
      var topImgNum = Math.floor(Math.random() * 2); // 随机数0或者1，取一张获取不取
      var topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      // 布局位于上侧的图片
      imgsArrangeTopArr.forEach(function (img, index) {
        imgsArrangeTopArr[index] = {
          pos: {
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
          },
          rotate: get30DegRandom(),
          isCenter: false
        };
      });

      // 布局位于左侧、右侧的图片
      var hPosRangeLeftOrRight = null;
      for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {

        if (i < k) {
          hPosRangeLeftOrRight = hPosRangeLeftSecX;
        } else {
          hPosRangeLeftOrRight = hPosRangeRightSecX;
        }

        imgsArrangeArr[i] = {
          pos: {
            left: getRangeRandom(hPosRangeLeftOrRight[0], hPosRangeLeftOrRight[1]),
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
          },
          rotate: get30DegRandom(),
          isCenter: false
        };
      }

      // 将上侧、中心图片放回数组取
      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      // update and render
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }

    /**
     * 利用rearrange函数，居中对应index的图片
     * @param index，需要被居中的图片对应的图片信息数组的index值
     * @return {Function}
     */

  }, {
    key: 'center',
    value: function center(index) {
      var _this5 = this;

      return function () {
        _this5.rearrange(index);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var controllerUnits = [],
          imgFigures = [];

      imagesURLs.forEach(function (img, index) {

        if (!_this6.state.imgsArrangeArr[index]) {
          _this6.state.imgsArrangeArr[index] = {
            pos: {
              left: '0',
              top: '0'
            },
            rotate: 0,
            isInverse: false,
            isCenter: false
          };
        }

        imgFigures.push(_react2.default.createElement(ImgFigure, { data: img,
          key: index,
          ref: 'imgFigure' + index,
          arrange: _this6.state.imgsArrangeArr[index],
          inverse: _this6.inverse(index),
          center: _this6.center(index) }));

        controllerUnits.push(_react2.default.createElement(ControllerUnit, { key: index, inverse: _this6.inverse(index),
          center: _this6.center(index),
          arrange: _this6.state.imgsArrangeArr[index] }));
      });

      return _react2.default.createElement(
        'section',
        { className: 'stage', ref: 'stage' },
        _react2.default.createElement(
          'section',
          { className: 'img-sec' },
          imgFigures
        ),
        _react2.default.createElement(
          'nav',
          { className: 'controller-nav' },
          controllerUnits
        )
      );
    }
  }]);

  return AppComponent;
}(_react2.default.Component);

AppComponent.defaultProps = {};

exports.default = AppComponent;

//# sourceMappingURL=Main-compiled.js.map