import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    BackHandler,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import NativeVideoPlayer from "./NativeVideoPlayer";
import Orientation from "react-native-orientation";

const NativeVideoPlayerContainer = ({ source, isDebug }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVolume ] = useState(0.5);
    const [ rememberVolume, setRememberVolume ] = useState(0.5);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(0);
    const [ duration, setDuration ] = useState(1);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const TimerHandler = useRef(null);
    const AnimationOverlay = useRef(new Animated.Value(0)).current;
    const video = useRef(null);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackHundle);

        return () => {
            if (TimerHandler.current !== null) {
                if (isDebug) {
                    console.log('Unmount Timer handler')
                }

                TimerHandler.current = null;
            }

            BackHandler.removeEventListener('hardwareBackPress', onBackHundle);
        }
    }, [fullscreen]);

    const onBackHundle = () => {
        if (fullscreen) {
            onFullscreen(fullscreen);

            return true;
        }
    };

    /**
     *  VIDEO EVENTS
     */

    const onProgress = (data) => {
        setSliderValue(data.currentTime);
        setCurrentTime(data.currentTime);
    };

    const onLoadStart = () => {
        if (isDebug) {
            console.log('Start Load of Source.');
        }

        if (isLoaded) {
            if (isDebug) {
                console.log('Source already loaded.');
            }

            video.current.seek(currentTime);
        }
    };

    const onLoad = (data) => {
        /**
         * {
         *      "canPlayFastForward": true,
         *      "canPlayReverse": true,
         *      "canPlaySlowForward": true,
         *      "canPlaySlowReverse": true,
         *      "canStepBackward": true,
         *      "canStepForward": true,
         *      "currentTime": 0,
         *      "duration": -0.001,
         *      "naturalSize": {"height": 720, "orientation": "landscape", "width": 1280}
         * }
         */
        setDuration(data.duration);
        setIsLoaded(true);
    };

    const onSeek = (value) => {
        setCurrentTime(value);
        setSliderValue(value);
        video.current.seek(value);
    };

    const onAudioBecomingNoisy = () => {
        setPaused(true);
    };

    const onAudioFocusChanged = (event) => {
        setPaused(!event.hasAudioFocus);
    };

    /**
     * CONTROLS EVENTS
     */

    const onAnimationRun = () => {
        Animated.parallel([
            Animated.timing(AnimationOverlay, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const onRefreshTimer = () => {
        clearTimeout(TimerHandler.current);

        if (paused) {
            TimerHandler.current = null;
            return true;
        }

        TimerHandler.current = setTimeout(() => {
            setIsVisible(false);
            TimerHandler.current = null;

        }, 3000);
    };

    const onFullscreen = (isSelected) => {
        setFullscreen(!isSelected);
        onRefreshTimer(paused);

        isSelected ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = () => {
        return (
            <TouchableOpacity onPress={() => onFullscreen(fullscreen) }>
                <Text style={{ color: '#fff', paddingRight: 10 }}>
                    <Icon name={fullscreen ? 'minimize' : 'maximize'} size={ fullscreen ? 30 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onCropPress = () => {
        let rzm = 'cover';

        switch (resizeMode) {
            case 'cover':
                rzm = 'contain';
                break;
            case 'contain':
                rzm = 'stretch';
                break;
            case 'stretch':
                rzm = 'cover';
                break;
            default:
                rzm = 'cover'
        }

        setResizeMode(rzm);
        onRefreshTimer();
    };

    const renderCropControl = () => {
        return (
            <TouchableOpacity onPress={onCropPress}>
                <Text style={{ paddingRight: 20, color: '#fff' }}>
                    <Icon name={'crop'} size={ fullscreen ? 30 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onTogglePlayPause = () => {
        setPaused(!paused);
        onRefreshTimer(!paused);
    };

    const renderPlayerAction = (size = 1) => {
        return (
            <TouchableOpacity onPress={() => onTogglePlayPause()}>
                <Text style={{ color: '#fff', paddingLeft: 10 }}>
                    <Icon name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 20 : 30 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onVolumeChange = (volume) => {
        setVolume(volume);
        setRememberVolume(volume);
        onRefreshTimer();
    };

    const onVolumeMute = () => {
        setVolume(volume ? 0 : rememberVolume);
        onRefreshTimer();
    };

    const renderVolumeAction = () => {
        let icon = 'volume';

        if (volume === 0) {
            icon = 'volume-x'
        } else if (volume > 0 && volume < 0.5) {
            icon = 'volume';
        } else if (volume >= 0.5 && volume < 1) {
            icon = 'volume-1'
        } else if (volume === 1) {
            icon = 'volume-2'
        }

        return (
            <View style={{ color: '#fff', paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={ onVolumeMute }>
                    <Text style={{ color: '#fff', paddingLeft: 10, marginLeft: 10, width: fullscreen ? 40 : 30 }}>
                        <Icon name={ icon } size={ fullscreen ? 30 : 20 } />
                    </Text>
                </TouchableOpacity>

                <Slider
                    style={fullscreen
                        ? { width: 150, height: 30 }
                        : { width: 100, height: 20 }
                    }
                    onValueChange={ onVolumeChange }
                    onSlidingStart={() => {
                        // todo
                    }}
                    onSlidingComplete={() => {
                        // todo
                    }}
                    value={volume}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#fff"
                />
            </View>
        )
    };

    const onShowControlsHandle = () => {
        setIsVisible(true);
        onAnimationRun();
        onRefreshTimer(paused);
        console.log('FFF');
    };

    return (
        <View style={fullscreen ? { backgroundColor: '#000' } : {}}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={ onShowControlsHandle }
            >
                <NativeVideoPlayer
                    setRef={ ref => video.current = ref }
                    source={ source }
                    fullscreen={ fullscreen }
                    volume={ volume }
                    muted={ muted }
                    paused={ paused }
                    rate={ rate }
                    resizeMode={ resizeMode }
                    repeat={ false }

                    onProgress={ onProgress }
                    onLoadStart={ onLoadStart }
                    onLoad={ onLoad }
                    onAudioBecomingNoisy={ onAudioBecomingNoisy }
                    onAudioFocusChanged={ onAudioFocusChanged }
                />
            </TouchableOpacity>

            {
                isVisible &&
                <Animated.View style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                    backgroundColor: 'rgba( 0, 0, 0, 0.3);',
                    opacity: AnimationOverlay,
                }}>
                    <Animated.View style={{
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 15
                    }}>

                        {renderPlayerAction(1.5)}

                    </Animated.View>

                    {
                        <Slider
                            style={{ height: 50, flex: 1 }}
                            value={sliderValue}
                            minimumValue={0}
                            maximumValue={duration}
                            step={1}
                            onValueChange={ onSeek }
                            minimumTrackTintColor="#fff"
                            maximumTrackTintColor="#fff"
                            thumbTintColor="#fff"
                        />
                    }

                    <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'rgba( 0, 0, 0, 0.5);',
                        paddingBottom: 1
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>

                            {renderPlayerAction()}
                            {renderVolumeAction()}

                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>

                            {renderCropControl()}
                            {renderFullscreenControl()}

                        </View>
                    </Animated.View>
                </Animated.View>
            }
        </View>
    )
};

NativeVideoPlayerContainer.defaultProps = {
    isDebug: true
};

export default NativeVideoPlayerContainer;