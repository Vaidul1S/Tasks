import 'package:flutter/material.dart';
import 'package:flutter_fwf/navbar.dart';

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
        appBar: AppBar(
          title: Center(
            child: Text(
              'Fun with Flags',
              style: TextStyle(color: Color.fromRGBO(135, 8, 139, 1), fontFamily: 'Papyrus'),
            ),
          ),
        ),
        bottomNavigationBar: NavBarWidget(),
      ),
    );
  }
}
