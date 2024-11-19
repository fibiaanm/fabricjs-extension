export type OperatingSystem = 'Mac' | 'Windows' | 'Linux';

export function getOS(): OperatingSystem {
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('mac')) {
        return 'Mac';
    }
    
    if (userAgent.includes('win')) {
        return 'Windows';
    }
    
    if (userAgent.includes('linux')) {
        return 'Linux';
    }
    
    return 'Linux';
}