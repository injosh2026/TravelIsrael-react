export type RoutePointType = {
    id: number;
    routeId: number;
    orderInRoute: number;
    title: string;
    description: string;
    estimatedStayMinutes: number;
    isStartPoint: boolean;
    isEndPoint: boolean;
}