import React from 'react'
import {Grid, Row, Col, Icon, IconButton} from 'rsuite'


export default function FooterComponent() {
    return (
        <div>
            <Grid fluid style={{backgroundColor: '#038C73'}}>
                <Row style={{marginBottom: '5%'}}>
                    <Col md={16} style={{textAlign: 'left', marginTop: '3%', marginBottom: '1%', padding: '1% 5%'}}>
                        <p style={{fontSize: '25px', color: 'white'}}>Any Help ? Contact Our Customer Service</p>
                        <p style={{fontSize: '15px', color: 'white'}}>(0271) - 751654</p>
                        <p style={{fontSize: '16px', color: 'white'}}>Jalan Kebangsaan Timur No. 57 Jakarta, Indonesia</p>
                        <p style={{fontSize: '16px', color: 'white'}}>PT. Sehat Mulya Indo</p>
                    </Col>
                    <Col md={8} style={{textAlign: 'center', marginTop: '3%', marginBottom: '1%'}}>
                        <IconButton style={{margin: '10px'}} icon={<Icon icon="facebook" />} circle size="lg" />
                        <IconButton style={{margin: '10px'}} icon={<Icon icon="instagram" />} circle size="lg" />
                        <IconButton style={{margin: '10px'}} icon={<Icon icon="twitter" />} circle size="lg" />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}
