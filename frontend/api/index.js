import instance from "./instance"
import { AuthApi } from "@/api/authApi"
import { RouteApi } from "@/api/routeApi";
import { DriverApi } from "@/api/driverApi"
import { BusApi } from "@/api/busApi"
import {ScheduleApi} from '@/api/scheduleApi'
const authApi = new AuthApi(instance);
const routeApi = new RouteApi(instance);
const driverApi = new DriverApi(instance)
const busApi = new BusApi(instance)
const scheduleApi = new ScheduleApi(instance)
export {
    authApi,
    routeApi,
    driverApi,
    busApi,
    scheduleApi
}