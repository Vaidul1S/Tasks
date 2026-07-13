import 'package:flutter/material.dart';
import 'package:flutter_fwf/navbar.dart';
import 'package:flutter_fwf/notifiers.dart';
import 'package:flutter_fwf/pages/credits.dart';
import 'package:flutter_fwf/pages/game.dart';

List<Widget> pages = [Game(), Credits()];

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fun with Flags',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
      ),
      home: Scaffold(        
        body: ValueListenableBuilder(valueListenable: selectedPageNotifier, builder: (context, value, child) {
          return pages.elementAt(value);
        },),
        bottomNavigationBar: NavBarWidget(),
      ),
    );
  }
}
