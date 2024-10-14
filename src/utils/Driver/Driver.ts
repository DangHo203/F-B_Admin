import {getShipperById} from '../../pages/Shipper/shipper.service';

export const getShipper = async (id: number) => {
    return await getShipperById(id);
}

export const fetchShipperInformation = async (id: number) => {
    const rs = await getShipperById(id);
    return rs?.data
}