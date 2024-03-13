import { createElement, useEffect, useRef, useState } from "react";
import { useMount, useUnmount, useUpdateEffect  } from 'react-use';

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface IWidgetScript {
    element: HTMLElement;

    mount: (props: Object) => void;

    update: (props: Object) => void;

    unmount: (props: Object) => void;

    [key: string]: any;
}

export const createWidget = (): WithOptional<IWidgetScript, 'element'> => ({

    myFunc() {
        console.log(1);
    },

    mount(props: Object) {
        this.element.addEventListener('click', this.myFunc)
    },

    update(props: Object) {
        
    },

    unmount(props: Object) {
        this.element.removeEventListener('click', this.myFunc)
    }

})

export const createWidgetInjector = (
    func: () => WithOptional<IWidgetScript, 'element'>,
    targetElement: HTMLElement
) => {

    const instance = func();
    instance.element = targetElement;

    return {
        mount() {
            //...
            instance.mount();
        },

        update() {
            //...
            instance.update();
        },

        unmount() {
            //...
            instance.unmount();
        }

    };
}

export const UniversalWidget = (store: any, className: string) => {

    const instanceRef = useRef<any>()
    const elementRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useMount(() => {
        async function prepare() {
            setIsLoading(true);
            //...
            const module: { createWidget: WithOptional<IWidgetScript, 'element'> } = {
                createWidget: () => {}
            };

            // @ts-ignore
            instanceRef.current = createWidgetInjector(module.createWidget, elementRef.current);

            store.set('1234', instanceRef.current)
            
            setIsLoading(false);

            return instanceRef.current;
        }

        prepare();
    })

    useEffect(() => {
        instanceRef.current?.mount();
    }, [instanceRef.current])

    useUpdateEffect(() => {
        instanceRef.current?.update();
    }, [])

    useUnmount(() => {
        instanceRef.current?.unmount();
        store.remove('1234');
        instanceRef.current = null;
    })

    return !isLoading 
        ? createElement('div', {
            ref: elementRef,
            className
        })
        : 'Loading...'
}
