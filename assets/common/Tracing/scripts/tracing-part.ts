interface TracePoint {
    x: number;
    y: number;
}

export class TracingPart {
    private _points: TracePoint[] = [];
    private _priority: number;

    constructor() {
        this._points = [];
    }

    get points(): TracePoint[] {
        return this._points;
    }

    set points(newVal) {
        this._points = newVal;
    }

    get priority(): number {
        return this._priority;
    }

    set priority(newVal) {
        this._priority = newVal;
    }

    public addPoint(point: TracePoint) {
        this._points.push(point);
    }

    public addPointAtIndex(point: TracePoint, startIndex: number) {
        this._points.splice(startIndex, 0, point);
    }

    public getAllTracingPoints() {
        return this.points;
    }
}
