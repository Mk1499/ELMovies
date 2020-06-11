
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.mk14.movielab.BuildConfig;
import com.mk14.movielab.R;

// @react-native-community/art
import com.reactnativecommunity.art.ARTPackage;
// @react-native-community/google-signin
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// react-native-document-picker
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-shared-element
import com.ijzerenhein.sharedelement.RNSharedElementPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-toasty
import ui.toasty.RNToastyPackage;
// react-native-youtube
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ARTPackage(),
      new RNGoogleSigninPackage(),
      new DocumentPickerPackage(),
      new RNGestureHandlerPackage(),
      new LinearGradientPackage(),
      new ReanimatedPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new RNSharedElementPackage(),
      new SplashScreenReactPackage(),
      new RNToastyPackage(),
      new ReactNativeYouTube()
    ));
  }
}
