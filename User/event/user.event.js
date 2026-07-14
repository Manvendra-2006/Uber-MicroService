import { subscribeToEvent } from "../service/rabit.js";

const pendingRequests = [];

export function waitForAcceptedRide(req, res) {

    req.setTimeout(30000, () => {
        res.status(204).end();
    });

    pendingRequests.push({
        userId: req.user.userProfileData._id.toString(),
        res
    });

    req.on("close", () => {
        const index = pendingRequests.findIndex(
            request => request.res === res
        );

        if (index !== -1) {
            pendingRequests.splice(index, 1);
        }
    });
}

export async function startAcceptedRideListener() {

    await subscribeToEvent("accepted-ride", (rideData) => {

        // rideData already object hai
        const index = pendingRequests.findIndex(
            request => request.userId === rideData.user.toString()
        );

        if (index !== -1) {

            pendingRequests[index].res.status(200).json({
                success: true,
                ride: rideData
            });

            pendingRequests.splice(index, 1);
        }

    });

}