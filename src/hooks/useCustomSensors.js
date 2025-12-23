import {MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";

export const useCustomSensors = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 5,
        },
    });

    return useSensors(mouseSensor, touchSensor);
}