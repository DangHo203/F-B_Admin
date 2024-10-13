import {getShipperById} from '../../pages/Shipper/shipper.service';

export const getShipper = async (id: number) => {
    return await getShipperById(id);
}