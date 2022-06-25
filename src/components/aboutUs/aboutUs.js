import React from 'react'
import {Carousel, Col, Divider, Row} from "antd";
import './index.css'


const contentStyle = {
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const AboutUs = () => {
    return <div style={{ margin: '-16px' }}>
        <Carousel autoplay>
            <div>
                <img style={contentStyle} src='https://firebasestorage.googleapis.com/v0/b/shop-24c6d.appspot.com/o/wallpaperflare.com_wallpaper.jpg?alt=media&token=fc44770a-87a2-41a5-9dd0-f5061f644bd7' />
            </div>
            <div>
                <img style={contentStyle} src='https://firebasestorage.googleapis.com/v0/b/shop-24c6d.appspot.com/o/wallpaperflare.com_wallpaper%20(1).jpg?alt=media&token=bc7b40c3-8e53-422b-9625-81f57da1f256' />
            </div>
            <div>
                <img style={contentStyle} src='https://firebasestorage.googleapis.com/v0/b/shop-24c6d.appspot.com/o/wallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=14a31ff9-506e-45ac-ba69-e41be3ac552f' />
            </div>
        </Carousel>
        <div className='services'>
            <div className="title">ПОСЛУГИ</div>
            <Divider style={{ maxWidth: '150px', minWidth: 'unset', margin: '24px auto', borderWidth: '3px' }} />
            <div className="sub-title">Юридична компанія надає юридичні та інші супутні послуги для громадян і бізнесу</div>
            <div className="services-items">
                <Row>
                    <Col span={6}>
                        <div className="services-item">
                            <img src='https://rubicon.ua/wp-content/uploads/2015/03/52e0dd414b54b108feda8460962f367a1d22dfe05a53704e7c2978d6_1920.jpg' />
                            <div className="label">ЮРИДИЧНА КОНСУЛЬТАЦІЯ</div>
                            <div className="description">Консультація адвоката і юриста з юридичних справ будь-якої складності</div>
                        </div></Col>
                    <Col span={6}>
                        <div className="services-item">
                            <img src='https://rubicon.ua/wp-content/uploads/2015/03/55e6d0454955a914f6d1867dda79307f1137c3e456587348722673d490_1920.jpg' />
                            <div className="label">ПОСЛУГИ ЗА КОРДОНОМ</div>
                            <div className="description">Польща, Туреччина, Франція, Італія, Чехія, Литва, Іспанія, США та інші країни</div>
                        </div></Col>
                    <Col span={6}>
                        <div className="services-item">
                            <img src='https://rubicon.ua/wp-content/uploads/2015/03/52e1d0424b54a814f6d1867dda79307f1137c3e456587348722672d49e_1920.jpg' />
                            <div className="label">ПЕРЕКЛАД ДОКУМЕНТІВ</div>
                            <div className="description">Письмовий і усний юридичний переклад. Нотаріальне завірення</div>
                        </div></Col>
                    <Col span={6}>
                        <div className="services-item">
                            <img src='https://rubicon.ua/wp-content/uploads/2015/03/54e3d4414856aa14f6d1867dda79307f1137c3e456587348722672d392_1920.jpg' />
                            <div className="label">АДВОКАТСЬКЕ РОЗСЛІДУВАННЯ</div>
                            <div className="description">Шлюбне шахрайство. Кримінал. Подружня зрада. Розшук</div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus lorem, egestas sed arcu quis, ullamcorper commodo purus. Integer et mi eros. Etiam sed dictum magna, ac pulvinar nisi. Phasellus enim sapien, tincidunt vel velit elementum, lacinia consequat lorem. Sed dolor lectus, pulvinar et pellentesque id, lacinia eu elit. Cras mattis ultrices sem eget efficitur. Cras sagittis sapien ac felis bibendum ultrices. Fusce vehicula luctus lacinia. Proin euismod varius commodo. Maecenas ex leo, finibus eget luctus in, luctus at ipsum. Vivamus laoreet convallis condimentum. Integer suscipit ligula a elementum maximus.
            </div>
        </div>
    </div>
}

export default AboutUs
