require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom'

// 获取图片相关的数据
let imagesDatas = require('../data/imagesDatas.json');

// 利用自执行函数，将图片名信息转换成图片url路径信息
let imagesURLs = ((imagesDatasArr) => {

    for (let i = 0, j = imagesDatasArr.length; i < j; i++) {
      var singleImageData = imagesDatasArr[i]
      singleImageData.imageURL = require('../images/' + singleImageData.fileName);
      imagesDatasArr[i] = singleImageData;
    }

    return imagesDatasArr;
})(imagesDatas);

let getRangeRandom = (low, high) => {
  return Math.ceil(Math.random() * (high - low) + low)
};

// 获取 0 ～ 30度 之间的一个任意正负数
let get30DegRandom = () => {
  return (Math.random() > 0.5? '' : '-') + Math.ceil(Math.random() * 30)
};

class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this)
  }

  handlerClick(event) {

    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  render() {

    let stylObj = {};

    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      stylObj = this.props.arrange.pos;
    }

    // 如果图片的旋转角度有值并且不为0，添加旋转角度
    if (this.props.arrange.rotate) {
      let types = ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'];
      for (let i in types) {
        stylObj[types[i]] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }

    }

    if (this.props.arrange.isCenter) {
      stylObj.zIndex = 11;
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';


    return (
      <figure className={imgFigureClassName} style={stylObj} onClick={this.handlerClick}>
        <div className="img-div">
          <img src={this.props.data.imageURL}
              alt={this.props.data.title}/>
        </div>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handlerClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

class ControllerUnit extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {


    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  render() {

    let controllerUnitClassName = "controller-unit";

    // 如果对应的是居中的图片，显示控制按钮的居中态
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += " is-center";

      if (this.props.arrange.isInverse) {
        controllerUnitClassName += " is-inverse";
      }

    }

    return <span className={controllerUnitClassName} onClick={this.handleClick} />

  }
}

class AppComponent extends React.Component {

  constructor(props){
    super(props)

    this.centerPos = {
      left: 0,
      top: 0
    };

    // 水平方向的取值范围
    this.hPosRange = {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0,0]
    };

    // 垂直方向的q取值范围
    this.vPosRange = {
      x: [0, 0],
      topY: [0, 0]
    }

    this.state = {
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
    }
  }

  // 组件加载以后，为每张图片计算其位置
  componentDidMount(){

    // 拿到舞台的大小
    // var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    var stageDOM = this.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      stageHalfW = Math.ceil(stageW / 2),
      stageHalfH = Math.ceil(stageH / 2);

    // 拿到一个imgFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
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
  inverse(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中图片是哪一张
   */
  rearrange(centerIndex) {

    let imgsArrangeArr = this.state.imgsArrangeArr,
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
      rotate: 0,  // 居中的 centerIndex 图片不需要旋转
      isCenter: true
    }

    // 取出要布局上侧图片的状态信息
    // 标记上侧区域的图片是从数组的哪个位置拿出来的
    let topImgNum = Math.floor(Math.random() * 2); // 随机数0或者1，取一张获取不取
    let topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((img, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    });

    // 布局位于左侧、右侧的图片
    let hPosRangeLeftOrRight = null;
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {

      if (i < k) {
        hPosRangeLeftOrRight = hPosRangeLeftSecX
      } else {
        hPosRangeLeftOrRight = hPosRangeRightSecX
      }

      imgsArrangeArr[i] = {
        pos: {
          left: getRangeRandom(hPosRangeLeftOrRight[0], hPosRangeLeftOrRight[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }

    }

    // 将上侧、中心图片放回数组取
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
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
  center(index) {
    return () => {
      this.rearrange(index);
    }
  }

  render() {

    var controllerUnits = [],
      imgFigures = [];

    imagesURLs.forEach((img, index) => {

      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imgFigures.push(<ImgFigure data={img}
                                 key={index}
                                 ref={'imgFigure' + index}
                                arrange={this.state.imgsArrangeArr[index]}
                                inverse={this.inverse(index)}
                                center={this.center(index)}
                      />);

      controllerUnits.push(<ControllerUnit key={index} inverse={this.inverse(index)}
                                            center={this.center(index)}
                                           arrange={this.state.imgsArrangeArr[index]}
                            />);
    });

    return (
      <section className = "stage" ref={(stage) => { this.stage = stage; }}>
        <section className = "img-sec">
          {imgFigures}
        </section>
        <nav className = "controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
