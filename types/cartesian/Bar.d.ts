import React, { Key, PureComponent, ReactElement, SVGProps } from 'react';
import { Props as RectangleProps } from '../shape/Rectangle';
import { Props as XAxisProps } from './XAxis';
import { Props as YAxisProps } from './YAxis';
import { D3Scale, TooltipType, LegendType, AnimationTiming, ChartOffset, DataKey, TickItem, PresentationAttributesAdaptChildEvent, AnimationDuration } from '../util/types';
import { ImplicitLabelType } from '../component/Label';
export interface BarRectangleItem extends RectangleProps {
    value?: number | [number, number];
    background?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
}
interface InternalBarProps {
    xAxis?: Omit<XAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
        x?: number;
        width?: number;
    };
    yAxis?: Omit<YAxisProps, 'scale'> & {
        scale: D3Scale<string | number>;
        y?: number;
        height?: number;
    };
    data?: BarRectangleItem[];
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}
declare type RectangleShapeType = ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | RectangleProps | boolean;
export interface BarProps extends InternalBarProps {
    className?: string;
    index?: Key;
    layout?: 'horizontal' | 'vertical';
    xAxisId?: string | number;
    yAxisId?: string | number;
    stackId?: string | number;
    barSize?: number;
    unit?: string | number;
    name?: string | number;
    dataKey: DataKey<any>;
    tooltipType?: TooltipType;
    legendType?: LegendType;
    minPointSize?: number;
    maxBarSize?: number;
    hide?: boolean;
    shape?: ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>);
    activeBar?: ReactElement<SVGProps<SVGElement>> | ((props: BarProps) => ReactElement<SVGProps<SVGElement>>) | boolean | SVGProps<SVGElement>;
    background?: RectangleShapeType;
    radius?: number | [number, number, number, number];
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    isAnimationActive?: boolean;
    animationBegin?: number;
    animationDuration?: AnimationDuration;
    animationEasing?: AnimationTiming;
    animationId?: number;
    id?: string;
    label?: ImplicitLabelType;
}
export declare type Props = Omit<PresentationAttributesAdaptChildEvent<any, SVGPathElement>, 'radius'> & BarProps;
interface State {
    readonly isAnimationFinished?: boolean;
    readonly prevData?: BarRectangleItem[];
    readonly curData?: BarRectangleItem[];
    readonly prevAnimationId?: number;
}
export declare class Bar extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        xAxisId: number;
        yAxisId: number;
        legendType: string;
        minPointSize: number;
        hide: boolean;
        data: BarRectangleItem[];
        layout: string;
        activeBar: boolean;
        isAnimationActive: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
    };
    static getComposedData: ({ props, item, barPosition, bandSize, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, dataStartIndex, displayedData, offset, }: {
        props: Props;
        item: Bar;
        barPosition: any;
        bandSize: number;
        xAxis: InternalBarProps['xAxis'];
        yAxis: InternalBarProps['yAxis'];
        xAxisTicks: TickItem[];
        yAxisTicks: TickItem[];
        stackedData: number[][];
        dataStartIndex: number;
        offset: ChartOffset;
        displayedData: any[];
    }) => {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        brushBottom?: number;
        data: any[];
        layout: "horizontal" | "vertical";
    };
    state: State;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): State;
    id: string;
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    static renderRectangle(option: RectangleShapeType, props: any): React.JSX.Element;
    renderRectanglesStatically(data: BarRectangleItem[]): React.JSX.Element[];
    renderRectanglesWithAnimation(): React.JSX.Element;
    renderRectangles(): React.JSX.Element | React.JSX.Element[];
    renderBackground(): React.JSX.Element[];
    renderErrorBar(needClip: boolean, clipPathId: string): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};