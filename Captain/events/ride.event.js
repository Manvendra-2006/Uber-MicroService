import { subscribeToEvent } from "../service/rabit.js";

const pendingRequests = [];

export function waitForNewRide(req, res) {

    req.setTimeout(30000, () => { // long polling 
        res.status(204).end();
    });

    pendingRequests.push(res);
}
 
export async function startRideListener() {

    await subscribeToEvent("new-ride", (rideData) => {

        pendingRequests.forEach(res => {
            res.json({data: JSON.parse(rideData)});
        });

        pendingRequests.length = 0;
    });

}