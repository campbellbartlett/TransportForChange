export interface Provider {
    name: string;
    website: string;
}

export interface Source {
    disclaimer: string;
    provider: Provider;
}

export interface Gtfs {
    directionId: number;
    operatorName: string;
    routeId: string;
    stopId: string;
}

export interface ExternalData {
    gtfs: Gtfs;
}

export interface ServiceColor {
    blue: number;
    green: number;
    red: number;
}

export interface ServiceTextColor {
    blue: number;
    green: number;
    red: number;
}

export interface Ticket {
    cost: number;
    exchange: number;
    name: string;
}

export interface Segment {
    availability: string;
    endTime: number;
    id: string;
    segmentTemplateHashCode: number;
    startTime: number;
    bicycleAccessible?: boolean;
    endPlatform: string;
    externalData: ExternalData;
    platform: string;
    routeDirection?: number;
    routeId: string;
    serviceColor: ServiceColor;
    serviceDirection: string;
    serviceName: string;
    serviceNumber: string;
    serviceTextColor: ServiceTextColor;
    serviceTripID: string;
    stops?: number;
    ticket: Ticket;
    ticketWebsiteURL: string;
    wheelchairAccessible?: boolean;
}

export interface Trip {
    arrive: number;
    availability: string;
    caloriesCost: number;
    carbonCost: number;
    currencySymbol: string;
    depart: number;
    hassleCost: number;
    hookURL: string;
    id: string;
    mainSegmentHashCode: number;
    moneyCost: number;
    moneyUSDCost: number;
    plannedURL: string;
    queryIsLeaveAfter: boolean;
    queryTime: number;
    saveURL: string;
    segments: Segment[];
    temporaryURL: string;
    updateURL: string;
    weightedScore: number;
    type: TripType;
}

export interface Group {
    frequency: number;
    sources: Source[];
    trips: Trip[];
}

export enum TripType {
    PT_PUB = 0,
    ME_CAR
}

export interface ModeInfo {
    alt: string;
    identifier: string;
    localIcon: string;
}

export interface From {
    address: string;
    class: string;
    lat: number;
    lng: number;
    timezone: string;
    code: string;
    id: string;
    modeInfo: ModeInfo;
    name: string;
    popularity?: number;
    services: string;
    stopCode: string;
    stopType: string;
    wheelchairAccessible?: boolean;
}

export interface Mini {
    description: string;
    instruction: string;
    mainValue: string;
}

export interface Color {
    blue: number;
    green: number;
    red: number;
}

export interface ModeInfo2 {
    alt: string;
    color: Color;
    identifier: string;
    localIcon: string;
}

export interface Street {
    encodedWaypoints: string;
    metres: number;
    name: string;
}

export interface ModeInfo3 {
    alt: string;
    identifier: string;
    localIcon: string;
}

export interface To {
    address: string;
    class: string;
    code: string;
    id: string;
    lat: number;
    lng: number;
    modeInfo: ModeInfo3;
    name: string;
    popularity: number;
    services: string;
    stopCode: string;
    stopType: string;
    timezone: string;
    wheelchairAccessible: boolean;
}

export interface CostComponent {
    cost: number;
    name: string;
    type: string;
}

export interface LocalCost {
    accuracy: string;
    cost: number;
    costComponents: CostComponent[];
    currency: string;
}

export interface Shape {
    encodedWaypoints: string;
    travelled: boolean;
}

export interface Source2 {
    provider: string;
}

export interface ModeInfo4 {
    alt: string;
    identifier: string;
    localIcon: string;
}

export interface Location {
    address: string;
    class: string;
    code: string;
    id: string;
    lat: number;
    lng: number;
    modeInfo: ModeInfo4;
    name: string;
    popularity: number;
    services: string;
    stopCode: string;
    stopType: string;
    timezone: string;
    wheelchairAccessible: boolean;
}

export interface SegmentTemplate {
    action: string;
    from: From;
    hashCode: number;
    metres: number;
    mini: Mini;
    modeIdentifier: string;
    modeInfo: ModeInfo2;
    notes: string;
    streets: Street[];
    to: To;
    travelDirection: number;
    type: string;
    visibility: string;
    endStopCode: string;
    localCost: LocalCost;
    operatorID: string;
    serviceOperator: string;
    shapes: Shape[];
    sources: Source2[];
    stopCode: string;
    location: Location;
}

export interface RoutingResponse {
    groups: Group[];
    realTimeStateURL: string;
    region: string;
    regions: string[];
    segmentTemplates: SegmentTemplate[];
}


